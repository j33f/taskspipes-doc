---
title: Backups, restore and moving
description: Back up TasksPipes by hand or on a schedule, encrypted and copied to S3-compatible storage; restore a backup; move the instance to another server in one command.
---

Three commands, set up by the [installer](/self-hosting/installation) for root and for the person who ran it:

| Command | What it does |
| --- | --- |
| `taskspipes-backup` | backs the instance up now; `--setup` plans backups, encrypts them, copies them to S3-compatible storage |
| `taskspipes-restore` | puts a backup back, on this server or on a new one |
| `taskspipes-transfer` | moves the instance to another server, over SSH |

They are scripts of the repository (`scripts/backup.sh`, `restore.sh`, `transfer.sh`): installed by hand, run them
with `sudo` from the installation's directory instead (`sudo ./scripts/backup.sh`). Each command has a `--help`.

Backups are made **on the server**, never by the app: the app only shows them, in **Administration › Backups**, and
tells the administrators when one fails.

## What a backup holds

One archive, `backups/taskspipes-backup-<version>-<date>.tar.gz` — `.tar.gz.gpg` once encrypted:

- **the database**, all of it: tasks, comments, history, settings made in the app, **and the attached files** (they
  are kept in the database);
- **`.env`**, with **`APP_SECRET`**: the Outline sessions, two-factor keys and secret settings kept in the database
  are encrypted with it, and cannot be read without it;
- `backup.env` (the settings of the backups) and, when the installer set up Caddy, `Caddyfile` and
  `compose.override.yml`;
- a manifest (date, server, version) and checksums, checked before anything is restored.

Nothing else is needed: Redis only holds rate-limit counters, Caddy gets its certificate again, and Docker downloads
the images again.

`.env` holds every secret of the instance: an archive that is not encrypted must stay as private as `.env` itself.
Archives are written readable by root only, in a directory only root can open.

## Back up now

```shell
taskspipes-backup
```

```
==> Backing up TasksPipes 0.21.0 (/opt/taskspipes)
==> Backup written: /opt/taskspipes/backups/taskspipes-backup-0.21.0-20261110-153012.tar.gz.gpg (2481352 bytes, encrypted)
==> Copying it to s3:my-bucket/taskspipes
==> Copied.
```

The app keeps running. `--db-only` leaves `.env` out (no secret in the archive), `--no-upload` keeps the backup on
the server, `--output DIR` writes it elsewhere. `taskspipes-backup --list` lists the backups kept on the server.

Updates back the instance up too, before they change anything: `taskspipes-update` with this same script, the
[one-click update](/self-hosting/installation#in-one-click) with a dump of the database
(`backups/taskspipes-before-update-<version>-<date>.dump`). The last five of each are kept.

## Plan backups

Nothing is planned until you choose to: the installer asks (`--backups none|daily|weekly`), and you can set it up, or
change it, at any time:

```shell
taskspipes-backup --setup
```

It asks, each answer with a suggestion that Enter keeps:

| Question | Suggestion |
| --- | --- |
| Automatic backups: `none`, `daily` or `weekly` (on Sundays) | `none` |
| At what time (the server's time) | `03:30` |
| How many backups to keep on the server | `14` |
| Encrypt backups with a passphrase | `yes` once an S3 copy is set up |
| Copy each backup to S3-compatible storage — then its endpoint, region, bucket, folder, keys, and how many to keep there | `no` |

Then it checks that the storage can be written to, writes `backup.env` (readable by root only, never read by the app),
sets up a **systemd timer** (or a cron entry where systemd is missing), shows the passphrase if it made one, and offers
to make a first backup at once.

```shell
taskspipes-backup --status       # the plan, the next run, the latest backups
```

Run `--setup` again to change anything; `--schedule none` stops the planned backups. Without questions:

```shell
sudo /opt/taskspipes/scripts/backup.sh --setup --yes --schedule daily --at 02:00 --keep 14 --generate-passphrase
```

### Encryption

With a passphrase, archives are encrypted with **gpg** (AES-256, symmetric) before they are written: the passphrase
is all it takes to open them, on any machine.

- Leave it empty and one is made for you (32 characters), or type your own (12 characters or more).
- **Keep it away from the server**, in a password manager: a copy is in `backup.env` so that planned backups run
  unattended, but it goes with the server if the server goes — and an encrypted backup cannot be restored without it.
- A new passphrase applies to the next backups; older ones keep theirs.

Opening an archive by hand: `gpg -d taskspipes-backup-….tar.gz.gpg | tar -xz`.

### A copy on S3-compatible storage

A backup kept only on the server is lost with the server. To copy each one elsewhere:

1. At your provider, create a **bucket** and an **access key** allowed to list, read, write and delete in it (and
   nothing else).
2. Run `taskspipes-backup --setup`, answer `yes` to the copy, then give the endpoint and region of the bucket's
   location (shown by the provider), the **bucket**, a **folder** in it (`taskspipes`), the keys, and how many backups
   to keep there (`30`). For instance:

   | Provider | Endpoint | Region |
   | --- | --- | --- |
   | AWS S3 | *(empty)* | e.g. `eu-west-3` |
   | Scaleway | `https://s3.fr-par.scw.cloud` | `fr-par` |
   | OVHcloud | `https://s3.gra.io.cloud.ovh.net` | `gra` |
   | Backblaze B2 | `https://s3.eu-central-003.backblazeb2.com` | `eu-central-003` |
   | Wasabi | `https://s3.eu-central-1.wasabisys.com` | `eu-central-1` |
   | Cloudflare R2 | `https://<account id>.r2.cloudflarestorage.com` | `auto` |
   | MinIO, Garage… | your server's URL | as set there |

The copy is made with [rclone](https://rclone.org), run in a container: nothing to install. Only **encrypted**
backups are sent: setting up a copy asks for a passphrase. The oldest are deleted beyond the count to keep.
`taskspipes-backup --list --remote` lists them.

To be safe from someone holding the server's keys (who could delete the copies too), turn on your provider's
**versioning** or **object lock** on the bucket.

### Other copies

The backups are plain files: any tool can take them elsewhere. From another machine, for instance:

```shell
rsync -a root@tasks.example.com:/opt/taskspipes/backups/ ./taskspipes-backups/
```

## When a backup fails

- **Administration › Backups** shows the plan, the last good backup and the recent ones, with their errors; the tab
  is marked when something is wrong.
- The administrators get an **e-mail and a push notification**, once, when a backup fails, when its copy to the
  storage fails, or when planned backups stop coming (no good one for 50 hours with daily backups, 8 days with weekly
  ones).
- On the server: `taskspipes-backup --status`, and the log of planned runs, `journalctl -u taskspipes-backup` (or
  `/var/log/taskspipes-backup.log` with cron).

## Restore a backup

A restore **replaces every piece of data of the instance** with the backup's. The state of the server is backed up
first, so that a restore can always be undone.

```shell
taskspipes-restore --list                    # the backups here, and on the storage
taskspipes-restore --latest                  # the latest one kept here
taskspipes-restore /opt/taskspipes/backups/taskspipes-backup-0.21.0-20261110-153012.tar.gz.gpg
taskspipes-restore --from-s3 latest          # download it from the storage first (or give its name)
```

It shows what the backup holds and asks you to type `restore`. Then it:

1. opens the backup — the passphrase comes from `backup.env`, or is asked — and checks its checksums;
2. backs this server up (`backups/taskspipes-before-restore-…`);
3. stops the app, replaces the database, starts everything again and waits until the app is healthy;
4. prints the command that undoes it.

It keeps this server's `.env`, unless there is none, or you give `--with-config` — it then puts back the backup's
(`.env`, `backup.env`, Caddy files; the replaced ones are kept as `*.before-restore`). When the backup was made with
another `APP_SECRET`, it says so and offers to take the backup's: with another secret, people must sign in to Outline
again and set up two-factor authentication anew.

A backup made by a newer version of TasksPipes makes the instance move to that version first (the published image);
built from the sources, update first (`taskspipes-update --version X`). An older backup is upgraded when the app
starts.

The dumps made before updates restore the same way (`.dump`, `.sql.gz`): they hold the database only.

## Move to another server

The new server needs Linux (as for the [installation](/self-hosting/installation#requirements)); Docker is
installed when missing. Lower the time-to-live (TTL) of the address in your DNS a day before, so that the switch
spreads quickly.

### In one command

From the current server, with SSH access to the new one (as root, or as a user allowed to use `sudo`):

```shell
taskspipes-transfer admin@new-server.example.com
```

It shows what it will do and asks for a go, then:

1. **stops the app here**, so that nothing changes while it moves (the database keeps running);
2. backs everything up — encrypted when backups are — and copies the backup to the new server, over SSH;
3. installs TasksPipes there from it: the same version, the same `.env` and secrets, the same settings, Caddy if this
   server had it, the planned backups of `backup.env`;
4. once the new server answers, offers to **stop TasksPipes here for good** (its data stays here) and turns its
   planned backups off.

If anything fails on the way, the app starts again here and nothing changed here. Options: `--domain` when the
address changes, `--dir` on the new server (`/opt/taskspipes`), `--port` and `--identity` for SSH, `--keep-running`
to leave the app running here meanwhile (what changes after the backup is then not moved).

Then point the address to the new server in your DNS, and sign in there.

### Step by step

The same, by hand:

1. On the current server, stop the app and back up:

   ```shell
   cd /opt/taskspipes && sudo docker compose stop app
   taskspipes-backup --no-upload
   ```

2. Copy the backup (its name was printed) to the new server:

   ```shell
   sudo scp /opt/taskspipes/backups/taskspipes-backup-….tar.gz.gpg admin@new-server:/tmp/
   ```

3. On the new server, install from it — the passphrase is asked when the backup is encrypted:

   ```shell
   curl -fsSL https://raw.githubusercontent.com/j33f/TasksPipes/main/scripts/install.sh | sudo bash -s -- \
     --restore /tmp/taskspipes-backup-….tar.gz.gpg
   ```

4. Point the address to the new server, check that everything is there, then stop the old one
   (`sudo docker compose stop` in its directory).

### From S3, when the old server is gone

With a copy on S3-compatible storage, a new server starts from the latest backup there:

```shell
curl -fsSL https://raw.githubusercontent.com/j33f/TasksPipes/main/scripts/install.sh | sudo bash -s -- \
  --restore s3:latest
```

It asks where the backups are (endpoint, region, bucket, folder, keys) and their passphrase — or give them with
`--backup-env backup.env`, a copy of the old server's `backup.env`, or `--passphrase-file`. `s3:NAME` restores
another backup than the latest.

### When the address changes

Give the new address with `--domain tasks.example.org` (to `taskspipes-transfer`, `install.sh --restore` or
`taskspipes-restore`): `APP_URL` and Caddy follow. Then, outside TasksPipes:

- the **Outline OAuth** application: redirect URL `https://<new address>/auth/outline/callback`;
- the **OpenID Connect** provider, if any: redirect URI `https://<new address>/auth/oidc/callback`;
- **GitHub and GitLab webhooks** of connected pipes call the old address: update them, or connect the pipes again;
- **calendar subscriptions** (`.ics` links) and installed apps: people subscribe or install again from the new
  address;
- **push notifications**: people turn them on again in Settings (a browser ties them to an address).

Links in e-mails sent before the move still point to the old address.

## Reference

| File | What it is |
| --- | --- |
| `backups/` | the backups (root only); `.last` names the latest |
| `backup.env` | the settings of the backups (root only, not read by the app) |
| `/etc/systemd/system/taskspipes-backup.timer` | when backups run (`/etc/cron.d/taskspipes-backup` without systemd) |

`backup.env`, written by `--setup`:

| Variable | Meaning |
| --- | --- |
| `BACKUP_SCHEDULE`, `BACKUP_AT` | `none`, `daily` or `weekly`; the time, `HH:MM` |
| `BACKUP_KEEP` | backups kept on the server |
| `BACKUP_PASSPHRASE` | encrypts them (empty: not encrypted) |
| `BACKUP_S3_ENDPOINT`, `BACKUP_S3_REGION`, `BACKUP_S3_BUCKET`, `BACKUP_S3_PREFIX` | where the copies go |
| `BACKUP_S3_ACCESS_KEY_ID`, `BACKUP_S3_SECRET_ACCESS_KEY` | the storage's keys |
| `BACKUP_S3_KEEP` | copies kept there |

The updater dumps the database before each one-click update; `BACKUP_BEFORE_UPDATE=false` in its environment turns
it off.

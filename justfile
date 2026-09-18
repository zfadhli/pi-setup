# pi-setup task runner — discoverable by agents via `just -l`
set dotenv-load := false

default:
  @just -l

map:
  eza -T -L 2 --git-ignore --icons=never . && tokei .

audit:
  bash .pi-scratch/enhance-pi-with-modern-tools-such-as-fg/verify.sh

test:
  @echo "no test suite yet — audit is the test"; just audit

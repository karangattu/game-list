#!/usr/bin/env bash
set -e
mkdir -p site/screenshots
declare -a games=(
  "birdle-marsh-madness|https://karangattu.github.io/birdle-marsh-madness/"
  "alma-bridge-newt-crosser|https://karangattu.github.io/alma-bridge-newt-crosser/"
  "save-the-newts|https://karangattu.github.io/save-the-newts/"
  "save-the-newts-3d|https://karangattu.github.io/save-the-newts-3d/"
  "hopes-corner-sort-and-serve|https://karangattu.github.io/hopes-corner-sort-and-serve/"
  "shower-and-supplies|https://karangattu.github.io/shower-and-supplies/"
  "birdle|https://karangattu.github.io/birdle/"
  "birdle-after-dark|https://karangattu.github.io/birdle-after-dark/"
  "whats-on-the-menu|https://karangattu.github.io/whats-on-the-menu/"
  "plant-or-pull|https://karangattu.github.io/plant-or-pull/"
)

for g in "${games[@]}"; do
  name="${g%%|*}"
  url="${g##*|}"
  out="site/screenshots/${name}.jpeg"
  if [ -f "$out" ]; then
    echo "skip $name"
    continue
  fi
  echo "Capturing $name -> $url"
  agent-browser open "$url" >/dev/null 2>&1 || true
  agent-browser wait 2500 >/dev/null 2>&1 || true
  agent-browser screenshot --screenshot-format jpeg --screenshot-quality 80 "$out" >/dev/null 2>&1 || echo "FAILED $name"
done
echo "Done"
ls -la site/screenshots

#!/bin/bash
# verify-urls.sh: Check if all important URLs are live and returning 200

URLS=(
  "https://aiopsvista.com/robots.txt"
  "https://aiopsvista.com/sitemap.xml"
  "https://aiopsvista.com/llms.txt"
  "https://aiopsvista.com/structured-data.jsonld"
  "https://aiopsvista.com/meta-tags-snippet.html"
)

all_ok=1
for url in "${URLS[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" -eq 200 ]; then
    echo "✅ $url is live (200)"
  else
    echo "❌ $url returned $status"
    all_ok=0
  fi
done

if [ $all_ok -eq 1 ]; then
  echo "\nAll URLs are live. (Google sitemap ping deprecated, step skipped.)"
else
  echo "\nSome URLs failed."
fi

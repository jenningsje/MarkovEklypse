#!/bin/bash

DIR="${1:-.}"

max_num=-1

for file in "$DIR"/*; do
    # Extract number from filename
    num=$(basename "$file" | grep -oE '[0-9]+' | head -n 1)

    # Skip if no number found
    [[ -z "$num" ]] && continue

    if (( num > max_num )); then
        max_num=$num
    fi
done

if (( max_num >= 0 )); then
    echo "$max_num"
else
    echo "No numbers found."
fi

# Ask for year and day values
read -rp "Enter the year: " year
read -rp "Enter the day: " day

directory="./${year}/${day}"

# Stop if the directory already exists
if [ -d "$directory" ]; then
  echo "Directory ${directory} already exists"
  exit 1
fi

# Copy the template directory
mkdir -p "$directory"
cp "./template/"* "$directory"

echo "Directory ${directory} created"

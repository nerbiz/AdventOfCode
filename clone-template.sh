# Ask for year and day values
read -p "Enter the year: " year
read -p "Enter the day: " day

directory="./${year}/day${day}"

# Stop if the directory already exists
if [ -d $directory ]; then
  echo "Directory ${directory} already exists"
  exit 1
fi

# Copy the template directory
mkdir -p $directory
cp "./template/"* $directory
mv "${directory}/00-1.html" "${directory}/${day}-1.html"

echo "Directory ${directory} created"

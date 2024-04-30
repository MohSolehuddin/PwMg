echo "setup instalation.."
mkdir -p private
file="./private/pw.json"
if [ ! -f "$file" ]; then
    echo '{"passwords":[]}' > "$file"
fi
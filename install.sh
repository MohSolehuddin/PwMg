# echo "perangkat yanag anda gunakan?"
# echo "1. Android"
# echo "2. Windows"
# echo "3. Linux"
# echo "4. MacOS"
# read device

# pkg install nodejs-lts -y
# echo "install nodejs-lts sukses!!!"

mkdir -p private
file="./private/pw.json"
if [ ! -f "$file" ]; then
    echo '{"passwords":[]}' > "$file"
fi
echo "setup success!!!..."
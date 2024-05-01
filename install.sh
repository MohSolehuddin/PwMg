echo "Perangkat yang Anda gunakan?"
echo "1. Android"
echo "2. Windows"
echo "3. Linux"
echo "4. MacOS"
read device

if [ $device -eq 1 ]; then
    if ! [ -x "$(command -v node)" ]; then
        pkg install nodejs-lts -y
        echo "Instalasi Node.js berhasil!!!"
    else
        echo "Node.js sudah terinstall."
    fi
elif [ $device -eq 2 ]; then
    echo "Anda menggunakan Windows."
    echo "Silakan unduh dan instal Node.js dari https://nodejs.org"
elif [ $device -eq 3 ]; then
    echo "Anda menggunakan Linux."
    if ! [ -x "$(command -v node)" ]; then
        sudo apt update
        sudo apt install nodejs -y
        sudo apt install npm -y
        echo "Instalasi Node.js berhasil!!!"
    else
        echo "Node.js sudah terinstall."
    fi
elif [ $device -eq 4 ]; then
    echo "Anda menggunakan MacOS."
    if ! [ -x "$(command -v node)" ]; then
        brew install node
        echo "Instalasi Node.js berhasil!!!"
    else
        echo "Node.js sudah terinstall."
    fi
else
    echo "Perangkat tidak dikenali."
fi

mkdir -p private
file="./private/pw.json"
if [ ! -f "$file" ]; then
    echo '{"passwords":[]}' > "$file"
fi
echo "Setup berhasil!!!"
#frontend
sudo apt-get update -y
sudo apt-get install -y locales
sudo apt-get install curl -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\ 
sudo apt-get install -y nodejs

#backend
sudo apt-get update -y
sudo apt install libcairo2-dev pkg-config python3-dev -y
pip install wheel setuptools --upgrade
pip install -r requirements.txt
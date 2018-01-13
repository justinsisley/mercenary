# Check root project
nsp check;

# Check babel preset
cd ./packages/babel-preset; nsp check

# Check CLI
cd ../cli; nsp check

# Check core
cd ../core; nsp check

# Check dev
cd ../dev; nsp check

# Check eslint config
cd ../eslint-config; nsp check

# Check starter
cd ../starter; nsp check

# Go back to root project directory
cd ../../

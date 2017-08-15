# Check root project
ncu;

# Check babel preset
cd ./packages/babel-preset-mercenary; ncu

# Check eslint config
cd ../eslint-config-mercenary; ncu

# Check CLI
cd ../mercenary-cli; ncu

# Check core
cd ../mercenary-core; ncu

# Check dev
cd ../mercenary-dev; ncu

# Check starter
cd ../mercenary-starter; ncu

# Go back to root project directory
cd ../../
# Update root project
ncu -u;

# Update babel preset
cd ./packages/babel-preset; ncu -u

# Update CLI
cd ../cli; ncu -u

# Update core
cd ../core; ncu -u

# Update dev
cd ../dev; ncu -u

# Update eslint config
cd ../eslint-config; ncu -u

# Update starter
cd ../starter; ncu -u

# Go back to root project directory
cd ../../
# Salon Scheduler
A hair salon reservation application allows users to conveniently select their desired date and time slot from a list of available options. This application simplifies the reservation process for both the salon and its customers by providing an easy-to-use interface for managing appointments. With this application, customers can effortlessly book their appointments at their preferred time and date, while salons can efficiently manage their schedules.

# Run
required node version 18.15.0 (lts)
```
# Install
yarn 

# Set up prisma
yarn prisma:init

# Start application
yarn start:dev

# In terminal
> Server is Running, address: {{host}} // See in config/development.ts
> Swagger: {{host}}/api/documentation
```

# Database 
All commands were included in `yarn prisma:init`
```
# Create sqlite file
yarn prisma:push

# Generate type
yarn prisma:generate

# Create seed
yarn prisma:seed
```

# Show tables
```
sqlite3 salon.sqlite

# show tables;
.tables

# See the database with prisma
yarn prisma:studio
```

# Test
```
# 10 test case exists
yarn test
```

# Documentation
```
# Swagger
{{host}}/api/documentation

# Postman
https://documenter.getpostman.com/view/4627621/2s93JzM1LQ
```
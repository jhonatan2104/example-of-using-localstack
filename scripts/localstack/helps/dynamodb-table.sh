echo '--Local Tables--'
aws dynamodb list-tables --endpoint-url http://localhost:4566

if [ $# -lt 1 ]; then
   echo "Add the name of the table you want to note!"
   exit 1
fi

echo "--Table ` echo $1`--"
aws dynamodb scan \
    --endpoint-url http://localhost:4566 \
    --table-name $1
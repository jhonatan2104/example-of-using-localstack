DIR=$(cd `dirname $0`/../../src/functions/YourFunction; pwd)
ROOT=$(cd `dirname $0`/../../; pwd)

cd $DIR

echo "Test Your Function"

echo "--Build Function--"
yarn build

cd $ROOT

sam build YourFunction

echo "--Test Invoke--"
sam local invoke --env-vars env.json \
 -e events/event.json \
 --docker-network host YourFunction
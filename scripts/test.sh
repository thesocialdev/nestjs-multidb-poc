#!/bin/bash

# Set the base URL of your app
BASE_URL="http://localhost:3007/personality"

# Generate random data for the new personality
RANDOM_NAME="Test Personality $(openssl rand -hex 3)"
RANDOM_SLUG="test-personality-$(openssl rand -hex 3)"
RANDOM_DESCRIPTION="A personality created for testing purposes with ID $(openssl rand -hex 3)"
RANDOM_WIKIDATA="Q$(openssl rand -base64 3 | tr -d '+/' | head -c 5)"

# Create a new personality
echo "Creating a new personality..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    --data-raw "{
        \"name\": \"$RANDOM_NAME\",
        \"slug\": \"$RANDOM_SLUG\",
        \"description\": \"$RANDOM_DESCRIPTION\",
        \"wikidata\": \"$RANDOM_WIKIDATA\",
        \"isHidden\": false
    }"
)
echo "Response: $CREATE_RESPONSE"
echo $CREATE_RESPONSE | jq -r '.id'
# Extract the ID of the created personality
ID=$(echo $CREATE_RESPONSE | jq -r '.id')
echo "Created personality ID: $ID"

# Get the created personality
echo "Getting the created personality..."
GET_RESPONSE=$(curl -s -X GET "$BASE_URL/$ID")
echo "Response: $GET_RESPONSE"

# Update the created personality
echo "Updating the created personality..."
UPDATE_DESCRIPTION="An updated description for $RANDOM_NAME"
UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/$ID" \
    -H "Content-Type: application/json" \
    --data-raw "{
        \"description\": \"$UPDATE_DESCRIPTION\"
    }"
)
echo "Response: $UPDATE_RESPONSE"

# Delete the created personality
echo "Deleting the created personality..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/$ID")
echo "Response: $DELETE_RESPONSE"

echo "Done."


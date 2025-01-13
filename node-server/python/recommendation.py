import pandas as pd
import numpy as np
import sys
import json

def recommend_items(customer_id, user_item_matrix, similarity_matrix, top_n=5):
    if customer_id not in user_item_matrix.index:
        return []

    # Get items the user interacted with
    user_interactions = user_item_matrix.loc[customer_id]
    interacted_items = user_interactions[user_interactions > 0].index

    # Calculate similarity scores for all items
    scores = similarity_matrix.loc[interacted_items].sum(axis=0)

    # Exclude already interacted items
    scores = scores[~scores.index.isin(interacted_items)]

    # Sort scores and return top N items
    recommended_items = scores.sort_values(ascending=False).head(top_n)
    return recommended_items.index.tolist()

def main():
    # Read data from stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    customer_id = data['customer_id']
    orders = pd.DataFrame(data['orders'])
    favorites = pd.DataFrame(data['favorites'])

    # Combine orders and favorites to calculate interaction weights
    orders['interaction'] = 1
    favorites['interaction'] = 2

    # Merge orders and favorites on customer_id and menu_id
    combined = pd.merge(orders, favorites, on=['customer_id', 'menu_id'], how='outer', suffixes=('_orders', '_favorites'))

    # Calculate final interaction weights
    combined['interaction'] = combined.apply(
        lambda row: 3 if not pd.isna(row['interaction_orders']) and not pd.isna(row['interaction_favorites'])
        else (2 if not pd.isna(row['interaction_favorites']) else 1),
        axis=1
    )

    # Prepare final interactions DataFrame
    interactions = combined[['customer_id', 'menu_id', 'interaction']]

    # Create user-item matrix
    user_item_matrix = interactions.pivot_table(
        index='customer_id',
        columns='menu_id',
        values='interaction',
        fill_value=0
    )

    # Calculate item similarity matrix
    item_similarity = np.dot(user_item_matrix.T, user_item_matrix)
    norms = np.array([np.sqrt(np.diagonal(item_similarity))])
    similarity_matrix = pd.DataFrame(
        item_similarity / (norms * norms.T),
        index=user_item_matrix.columns,
        columns=user_item_matrix.columns
    )

    # Generate recommendations
    recommendations = recommend_items(customer_id, user_item_matrix, similarity_matrix)

    # Output recommendations as JSON
    print(json.dumps({"recommendations": recommendations}))

if __name__ == "__main__":
    main()

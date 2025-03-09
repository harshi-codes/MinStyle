import os

import google.generativeai as genai


def get_clothing_recommendation():
    # Configure the API with your key
    # You need to set your API key as an environment variable or input it directly
    api_key = input("Enter your Gemini API key: ")
    genai.configure(api_key=api_key)

    # Get user inputs for parameters
    style = input("Enter style (e.g., casual, formal, vintage): ")
    color = input("Enter color: ")
    vibe = input("Enter vibe (e.g., elegant, sporty, bohemian): ")
    gender = input("Enter gender: ")
    event = input("Enter event (e.g., wedding, beach party, work): ")

    # Create the prompt
    prompt = f"""
    I need a specific clothing search recommendation. Based on these parameters:
    - Style: {style}
    - Color: {color}
    - Vibe: {vibe}
    - Gender: {gender}
    - Event: {event}
    Give me a single, concise search term without slashes or brackets that combines all these elements. Keep it under 8 words so it works effectively on e-commerce sites.
    """

    # Set up the model
    model = genai.GenerativeModel("gemini-2.0-flash")

    # Get the response
    response = model.generate_content(prompt)

    # Extract and clean the response
    recommendation = response.text.strip()

    # Remove double quotes if present
    recommendation = recommendation.replace('"', "")

    return recommendation


if __name__ == "__main__":
    try:
        result = get_clothing_recommendation()
        print("\nRecommended search term:")
        print(result)
    except Exception as e:
        print(f"An error occurred: {e}")

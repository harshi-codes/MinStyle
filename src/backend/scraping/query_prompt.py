import os

import google.generativeai as genai
from dotenv import load_dotenv


def prompt_to_query():
    load_dotenv()
    api_key = os.getenv("API_KEY")
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
    Give me a single, concise search term without slashes or brackets that combines all these elements. Keep it under 10 words so it works effectively on e-commerce sites. Dont just put those parameters together s ecoomerce sites struggle with a long prompt so try to make it short and concise yet filling all the parameters.
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

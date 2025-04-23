import os

import google.generativeai as genai
from dotenv import load_dotenv


def generate_from_args(style, color, vibe, gender, event):
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=api_key)

    prompt = f"""
    I need a specific clothing search recommendation. Based on these parameters:
    - Style: {style}
    - Color: {color}
    - Vibe: {vibe}
    - Gender: {gender}
    - Event: {event}
    Give me a single, concise search term without slashes or brackets that combines all these elements. 
    Keep it under 7 words so it works effectively on e-commerce sites.
    """

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text.strip().replace('"', "")
    except Exception as e:
        print(f"Error generating query: {e}")
        return None


# Original function remains for direct CLI use
def prompt_to_query():
    style = input("Enter style (e.g., casual, formal, vintage): ")
    color = input("Enter color: ")
    vibe = input("Enter vibe (e.g., elegant, sporty, bohemian): ")
    gender = input("Enter gender: ")
    event = input("Enter event (e.g., wedding, beach party, work): ")

    return generate_from_args(style, color, vibe, gender, event)

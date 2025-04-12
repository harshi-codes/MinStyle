# MinStyle: Fashion in a Flash

![MinStyle Banner]()

## 🚀 Overview

MinStyle is a web-based tool designed to simplify fashion shopping by fetching results from multiple e-commerce platforms. Users can search for clothing based on parameters like style, color, vibe, price range, gender, and event type. The platform promotes sustainability by integrating thrift store options and offering a fashion blog focused on eco-friendly shopping.

## 🌟 Features

- **Multi-Platform Search:** Scrapes fashion websites (Myntra, Ajio, Amazon) to provide curated results.
- **Advanced Filtering:** Refine results by price, size, and more.
- **Thrift Store Integration:** Encourages sustainable fashion choices.
- **Fashion Blog:** Team-curated articles on thrift shopping and sustainability.
- ** Brand Review:** Promoting sustainable and Indie brands based on sustainability efforts, ethical practices and quality.

## 🛠️ Tech Stack

- **Frontend:** React (TypeScript),
Vite for lightning-fast builds,
Tailwind CSS for utility-first styling,
ShadCN/UI for elegant UI components.
- **Backend:** Python (Flask)
- **Web Scraping:** Selenium, BeautifulSoup
- **Authentication & Storage:** Firebase

## ⚙️ How It Works

1. **User Input:** Enter style preferences, price range, event type, etc.
2. **Web Scraping:** Retrieve product details (name, price, image, link) from multiple sites.
3. **Data Processing:** Filter and randomize products, storing them in a unified JSON file.
4. **Frontend Display:** Interactive UI presents the results with additional filtering options.

## 🔥 Challenges & Limitations

- **Size Filtering Issue:** Scraping size details is currently not feasible.

## 📸 Screenshot

![MinStyle UI Preview]()

## 🏗️ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minstyle.git
   cd minstyle
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```
4. Open the website in your browser.

## Contributors

This project was developed by the team "We Can't Code" during the Hack to the Future Hackathon. The team members are:

- [harshi-codes](https://github.com/harshi-codes)
- [slyeet03](https://github.com/slyeet03)
- [dhruv](https://www.linkedin.com/in/dhruv-sharda-8a6231239/)
- [rudracodess](https://www.linkedin.com/in/rudracodes)
- [saish]()
- [maanya](https://www.linkedin.com/in/maanya-jajodia-3905a7336/)

## 🏆 Acknowledgment

Developed as a part of the **CAI (Creativity and Innovation) class** project.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

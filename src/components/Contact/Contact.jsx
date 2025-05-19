import { useState } from "react";
import styles from "./ProductRentingSystem.module.css";

const ProductRentingSystem = () => {
  const [products] = useState([
    {
      id: 5,
      name: "Eco-Friendly Toothbrush",
      productLink:
        "https://www.amazon.in/CARE-CUB-Purple-Bamboo-Toothbrush/dp/B0CT8W29FG",
      imageUrl: "./images/image5.webp",
      description:
      "CARE CUB Purple Bamboo Toothbrush - Activated Charcoal Soft Bristles, Eco-Friendly, Antibacterial, Biodegradable in Elegant Purple",
      price: "₹45",
      shareLink:
      "https://www.amazon.in/CARE-CUB-Purple-Bamboo-Toothbrush/dp/B0CT8W29FG",
    },
    {
      id: 3,
    name: "Reusable Grocery Bags",
    productLink:
      "https://www.amazon.in/Kuber-Industries-Shopping-Vegetable-Multicolor/dp/B0CWRB2ZDK",
    imageUrl: "./images/image3.jpg",
    description:
      "Kuber Industries Shopping Handbag | Grocery Shopping Bag | Reusable Shopping Bags | Vegetable Bag | Carry Bag | Pack of 6 | Multicolor",
    price: "₹104",
    shareLink:
    "https://www.amazon.in/Kuber-Industries-Shopping-Vegetable-Multicolor/dp/B0CWRB2ZDK",
    },
    {
      id: 4,
      name: "Organic Fertilizers",
      productLink:
        "https://www.amazon.in/dp/B09CPN69C3/ref=vp_d_fuw_pd?_encoding=UTF8&pf_rd_p=87f7c996-fc25-43f9-b74c-b823918dcab1&pf_rd_r=1DGJJENSBREB191WP335&pd_rd_wg=nk8Xq&pd_rd_i=B09CPN69C3&pd_rd_w=cO9yu&content-id=amzn1.sym.87f7c996-fc25-43f9-b74c-b823918dcab1&pd_rd_r=aa479240-f835-4b79-8c84-5a51d28e398a&th=1",
      imageUrl: "./images/image4.jpg",
      description:
        "Greenwood 100% Organic Vermicompost Fertilizer Manure For Plants As Insecticide - 1 Kg for Home Gardening | Soil Mix for Pot Plants | Compost Garden Soil | Natural Booster for Flowering Plant",
      price: "₹119",
      shareLink:
      "https://www.amazon.in/dp/B09CPN69C3/ref=vp_d_fuw_pd?_encoding=UTF8&pf_rd_p=87f7c996-fc25-43f9-b74c-b823918dcab1&pf_rd_r=1DGJJENSBREB191WP335&pd_rd_wg=nk8Xq&pd_rd_i=B09CPN69C3&pd_rd_w=cO9yu&content-id=amzn1.sym.87f7c996-fc25-43f9-b74c-b823918dcab1&pd_rd_r=aa479240-f835-4b79-8c84-5a51d28e398a&th=1",
    },
    {
      id: 2,
      name: "Compost Bins",
      productLink:
        "https://www.amazon.in/Sustainable-Accelerated-Decomposition-Pathogen-Free-Cost-Effective/dp/B07C5FNJLG",
        imageUrl: "./images/image2.png",
      description:
        "Bloom Buddy Organic Bokashi Compost Booster 250 G | Certified & Sustainable | Accelerated Decomposition | Pathogen-Free | Microbial & Soil Enrichment | Waste Reduction | Cost-Effective",
      price: "₹139",
      shareLink:
        "https://www.amazon.in/Sustainable-Accelerated-Decomposition-Pathogen-Free-Cost-Effective/dp/B07C5FNJLG",
      },
    {
      id: 6,
      name: "Plant-Based Compostable Bags",
      productLink:
      "https://www.amazon.in/Shalimar-Lavender-Fragrance-Small-Bag-Green/dp/B08DHV38W8",
      imageUrl: "./images/image6.webp",
      description:
        "Shalimar Plastic Premium Garbage Bags(Lavender Fragrance) Size 17 X 19 Inches(Small)120 Count(4 Rolls) Dustbin Bag/Trash Bag-Green Color.",
      price: "₹199",
      shareLink:
        "https://www.amazon.in/Shalimar-Lavender-Fragrance-Small-Bag-Green/dp/B08DHV38W8",
      },
    {
      id: 7,
      name: "Organic Seeds",
      productLink:
      "https://www.amazon.in/ONLY-ORGANIC-Variety-Vegetable-Instruction/dp/B075GFVKG6",
      imageUrl: "./images/image7.webp",
      description:
      "ONLY FOR ORGANIC 45 Variety Of Vegetable Seeds With Instruction Manual",
      price: "₹179",
      shareLink:
      "https://www.amazon.in/ONLY-ORGANIC-Variety-Vegetable-Instruction/dp/B075GFVKG6",
    },
    {
      id: 8,
      name: "Natural Fiber Rugs",
      productLink:
        "https://www.amazon.in/TRENDOZE-Braided-Natural-Reversible-Restaurant/dp/B0D8GDKGVC",
        imageUrl: "./images/image8.webp",
        description:
        "TRENDOZE Jute Braided Area Rug Jute Natural Reversible Rugs Braided Floor Carpet for Living Room, Bedroom, Dining, Office, Restaurant (2 X 2 Feet, Design 2)",
      price: "₹279",
      shareLink:
      "https://www.amazon.in/TRENDOZE-Braided-Natural-Reversible-Restaurant/dp/B0D8GDKGVC",
    },
    {
      id: 9,
      name: "Eco-Friendly Paper Cup",
      productLink:
        "https://www.amazon.in/ECO-SOUL-Biodegradable-Eco-Friendly-Compostable/dp/B0CZX9MB7L",
      imageUrl: "./images/image9.webp",
      description:
        "ECO SOUL [120 Ml, 100 Count Biodegradable Paper Cups | Eco-Friendly Compostable Sustainable Disposable Drinking Cups | Cocktail Cold Drink Juice Paper Cups, White",
      price: "₹201",
      shareLink:
        "https://www.amazon.in/ECO-SOUL-Biodegradable-Eco-Friendly-Compostable/dp/B0CZX9MB7L",
    },
    {
      id: 10,
      name: "Reusable Coffee Filters",
      productLink:
      "https://www.amazon.in/Tea-Cheesecloth-Drawstring-Penetration-Unbleached/dp/B0DH54W479",
      imageUrl: "./images/image10.webp",
      description:
      "Tea Filters Strainer Bags Reusable Coffee Brew Herb Cheesecloth Muslin Mesh Bag with Drawstring Safe Penetration Unbleached for Loose Leaf Tea Office Home Kitchen Milk Tea, 4x3 Inch (5) (5)",
      price: "₹99",
      shareLink:
      "https://www.amazon.in/Tea-Cheesecloth-Drawstring-Penetration-Unbleached/dp/B0DH54W479",
    },
    {
      id: 11,
      name: "Eco-Friendly Yoga Mats",
      productLink:
      "https://www.amazon.in/Motus-Yoga-Mat-Exercises-Color-Multi/dp/B07YFYPVHR",
      imageUrl: "./images/image11.webp",
      description:
      "Motus Yoga Mat - Upgraded Yoga Mat with Extra Thick and Eco Friendly Non-Slip Exercise & Fitness, Workout Mat for All Type of Yoga, Pilates and Floor Exercises(3 mm Size)(Color-Multi)",
      price: "₹204",
      shareLink:
      "https://www.amazon.in/Motus-Yoga-Mat-Exercises-Color-Multi/dp/B07YFYPVHR",
    },
    {
      id: 1,
      name: "Biodegradable Plant Pots",
      productLink: "https://amzn.in/d/dGqitUo",
      imageUrl: "./images/image1.png",
      description:
        "ecofynd 4 inches Coir Pots, Biodegradable Garden Nursery Coco Natural Cup for Plants, Seed Germination Kits 100% Eco-Friendly and Indoor Outdoor Seedling Sprouting Transplant (Pack of 3)",
      price: "₹189",
      shareLink: "https://amzn.in/d/dGqitUo",
    },
    {
      id: 12,
      name: "Beeswax Food Wraps",
      productLink:
        "https://www.amazon.in/Ezee-Biodegradable-Multipurpose-Non-Stick-Microwave/dp/B0C9QH2QJQ",
      imageUrl: "./images/image12.webp",
      description:
        "Ezee 30 Meters 12 Inches Cling Film Wrap BPA Free | Multipurpose Food Wrapping Paper | Non-Stick Microwave Safe",
      price: "₹99",
      shareLink:
        "https://www.amazon.in/Ezee-Biodegradable-Multipurpose-Non-Stick-Microwave/dp/B0C9QH2QJQ",
    },
    {
      id: 13,
      name: "Solar-Powered Phone Chargers",
      productLink:
        "https://www.amazon.in/1500mAh-Capacity-Keychain-Carabiner-Emergency/dp/B0CSKK2PDM",
      imageUrl: "./images/image13.webp",
      description:
        "swabs® 1500mAh Large Capacity Battery Small Solar Charger Solar Power Bank Keychain Charger for Mobile Phones with Carabiner Emergency Power Supply - C pin",
      price: "₹739",
      shareLink:
        "https://www.amazon.in/1500mAh-Capacity-Keychain-Carabiner-Emergency/dp/B0CSKK2PDM",
    },
    {
      id: 14,
      name: "Bamboo Cutlery Sets",
      productLink:
        "https://www.amazon.in/MKSL-Disposable-Wooden-Fork-Sets/dp/B0DFTG6FM1",
      imageUrl: "./images/image14.webp",
      description:
        "MKSL Disposable Wooden Fruit Fork Sets | Mini Fork for Snacks | Eco-Friendly Wooden Cutlery | Bamboo Party Forks | Mini Cocktail Picks |Fruit Appetizers Dessert Forks (Pack of 100, 3.5 inches)",
      price: "₹94",
      shareLink:
        "https://www.amazon.in/MKSL-Disposable-Wooden-Fork-Sets/dp/B0DFTG6FM1",
    },
    {
      id: 15,
      name: "Compostable Plates and Cutlery",
      productLink:
        "https://www.amazon.in/Freshee-Compartment-Bagasse-Disposable-Compostable/dp/B0D1YDJ79L/ref=sr_1_2?crid=2AL45KPG995EV&dib=eyJ2IjoiMSJ9.Deo6VjzNIjeUOD-dFAEKFvxYcQQD4K8AYvPTp-GYp3JX5_eGtHp3CWClOZjfF6L6-abRONHAVmxA9WWVyZUS9kl8XrecyCs66YsssYqUBgHuMFlErUoP9F16lXsHzrcLIRGR-2-6O_9cadldMlmnUPVqWy8NLsmH6qu4lYhgq_LxNiaQuCG-Ki9dM3-Z7POyCE4pZVFjVrOS6YS3NIoHtHWwyyu42rwP45ZtmBgtEXrFn7IdO0-_aho8pajb3XsHREB7N-Y_y_JaUlb1s89uEZKCMaMjBAazpvJljbE4Tuk.7FUl4MRBiUcA-PT8sOGU5THuVfYibXOKa_e9mvmTXZ0&dib_tag=se&keywords=Compostable+Plates+and+Cutlery&qid=1729141958&refinements=p_36%3A-18000&rnid=3444809031&sprefix=compostable+plates+and+cutlery%2Caps%2C323&sr=8-2",
      imageUrl: "./images/image15.jpg",
      description:
        "Freshee 5 Compartment Bagasse Plates for Food Serving, Pack of 10 Disposable Plate | Compostable Cutlery for Wedding and Party",
      price: "₹179",
      shareLink:
        "https://www.amazon.in/Freshee-Compartment-Bagasse-Disposable-Compostable/dp/B0D1YDJ79L/ref=sr_1_2?crid=2AL45KPG995EV&dib=eyJ2IjoiMSJ9.Deo6VjzNIjeUOD-dFAEKFvxYcQQD4K8AYvPTp-GYp3JX5_eGtHp3CWClOZjfF6L6-abRONHAVmxA9WWVyZUS9kl8XrecyCs66YsssYqUBgHuMFlErUoP9F16lXsHzrcLIRGR-2-6O_9cadldMlmnUPVqWy8NLsmH6qu4lYhgq_LxNiaQuCG-Ki9dM3-Z7POyCE4pZVFjVrOS6YS3NIoHtHWwyyu42rwP45ZtmBgtEXrFn7IdO0-_aho8pajb3XsHREB7N-Y_y_JaUlb1s89uEZKCMaMjBAazpvJljbE4Tuk.7FUl4MRBiUcA-PT8sOGU5THuVfYibXOKa_e9mvmTXZ0&dib_tag=se&keywords=Compostable+Plates+and+Cutlery&qid=1729141958&refinements=p_36%3A-18000&rnid=3444809031&sprefix=compostable+plates+and+cutlery%2Caps%2C323&sr=8-2",
    },
    {
      id: 16,
      name: "Bamboo Cutlery Sets",
      productLink:
        "https://www.amazon.in/Earthy-Sapo-Reetha-Shampoo-Bar/dp/B06XHVZYLN/ref=sr_1_9?crid=3G3NFM24NEU77&dib=eyJ2IjoiMSJ9.Ts7fZSqszqd52SPghBa2SSkJmal1AvroRwEIrd36afHpjPJO1U0xfJahVqKxxMck1gnfnNaGXwcYXdis20XOVGOtfxx1LW5cejohCvoYHUBxs8UidIyvwbZmEWSCm0qPSdMxBkF7D5FAP3ni3uzK-SKFYtaQ4CB0RrtzcfndZpwxuga3aqO7TvkSmQezjR8k9JGq-sqr4YT4VcwEmvxhrrE0f6yCz6mqPMcqEXVKBXbsKpSMKmhRyDb8Qqz2c9tv4AR15B5Uq0DIsDyhRippNNt0Eu0CqcS1jmuWMiFaH1I.l-jEpEDZNRoa14m5fG4Xz2-pv7xqBSHBlnk7ImUMQ3E&dib_tag=se&keywords=Organic+Soaps+and+Shampoos&nsdOptOutParam=true&qid=1729142043&refinements=p_36%3A-42000&rnid=1741387031&sprefix=organic+soaps+and+shampoos%2Caps%2C260&sr=8-9",
      imageUrl: "./images/image16.webp",
      description:
        "Earthy Sapo Handmade Ayurvedic Reetha Shampoo Bar for Dry Hair, 100g, Pack of 1, with Reetha & Coconut Milk - Hair Care, Vegan, Chemical-Free, Eco-Friendly",
      price: "₹242",
      shareLink:
        "https://www.amazon.in/Earthy-Sapo-Reetha-Shampoo-Bar/dp/B06XHVZYLN/ref=sr_1_9?crid=3G3NFM24NEU77&dib=eyJ2IjoiMSJ9.Ts7fZSqszqd52SPghBa2SSkJmal1AvroRwEIrd36afHpjPJO1U0xfJahVqKxxMck1gnfnNaGXwcYXdis20XOVGOtfxx1LW5cejohCvoYHUBxs8UidIyvwbZmEWSCm0qPSdMxBkF7D5FAP3ni3uzK-SKFYtaQ4CB0RrtzcfndZpwxuga3aqO7TvkSmQezjR8k9JGq-sqr4YT4VcwEmvxhrrE0f6yCz6mqPMcqEXVKBXbsKpSMKmhRyDb8Qqz2c9tv4AR15B5Uq0DIsDyhRippNNt0Eu0CqcS1jmuWMiFaH1I.l-jEpEDZNRoa14m5fG4Xz2-pv7xqBSHBlnk7ImUMQ3E&dib_tag=se&keywords=Organic+Soaps+and+Shampoos&nsdOptOutParam=true&qid=1729142043&refinements=p_36%3A-42000&rnid=1741387031&sprefix=organic+soaps+and+shampoos%2Caps%2C260&sr=8-9",
    },
    // Add more products here...
  ]);

  const handleShare = (link) => {
    navigator.clipboard.writeText(link);
    alert("Product link copied to clipboard!");
  };

  const shareOnSocialMedia = (platform, shareLink) => {
    let url = "";
    const encodedLink = encodeURIComponent(shareLink);

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedLink}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodedLink}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.productRentingSystem}>
      <h2 className={styles.heading}>Eco-Friendly Products</h2>
      <ul className={styles.productsList}>
        {products.map((product) => (
          <li className={styles.productCard} key={product.id}>
            <h4 className={styles.productName}>{product.name}</h4>
            <img
              className={styles.productImage}
              src={product.imageUrl}
              alt={product.name}
              width="200"
            />
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.price}>Price: {product.price}</p>{" "}
            {/* Added price display */}
            <p>
              <a
                href={product.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.productLink}
              >
                Buy {product.name}
              </a>
            </p>
            <button
              className={styles.shareButton}
              onClick={() => handleShare(product.shareLink)}
            >
              Copy Link
            </button>
            <div className={styles.socialShare}>
              <button
                onClick={() =>
                  shareOnSocialMedia("facebook", product.shareLink)
                }
              >
                <img
                  src="/images/facebook.svg"
                  alt="Facebook"
                  className={styles.icon}
                />
                Facebook
              </button>
              <button
                onClick={() => shareOnSocialMedia("twitter", product.shareLink)}
              >
                <img
                  src="/images/twitter.svg"
                  alt="Twitter"
                  className={styles.icon}
                />
                Twitter
              </button>
              <button
                onClick={() =>
                  shareOnSocialMedia("whatsapp", product.shareLink)
                }
              >
                <img
                  src="/images/whatsapp.svg"
                  alt="WhatsApp"
                  className={styles.icon}
                />
                WhatsApp
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRentingSystem;

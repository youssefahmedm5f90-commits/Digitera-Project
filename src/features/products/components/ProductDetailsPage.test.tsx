import { render, screen, fireEvent } from "@testing-library/react";
import { ProductDetails } from "./ProductDetails";
import { ProductOptions } from "./ProductOptions";
import { ScentAnatomy } from "./ScentAnatomy";
import { ProductBreadcrumbs } from "./ProductBreadcrumbs";
import { AddToCartButton } from "@/features/cart/components/AddToCartButton";
import type { Product } from "@/features/products/types/product.types";

const sampleProduct: Product = {
  id: "santal-parchment",
  name: "Santal Parchment",
  description: "An evocative warmth of Australian sandalwood folded into spiced paper nuances.",
  notes: "Sandalwood, Cardamom, Amber",
  price: 220,
  images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80"],
  category: "fragrance",
  scentFamily: "woody",
  occasion: "evening",
  topNotes: "Bergamot, Incense, Pink Pepper",
  heartNotes: "Iris, Papyrus, Cedarwood",
  baseNotes: "West Indian Sandalwood, Cardamom, Amber",
  options: [
    {
      id: "size",
      name: "Select Volume",
      values: ["30 ml", "50 ml", "100 ml"],
      prices: {
        "30 ml": 140,
        "50 ml": 180,
        "100 ml": 220,
      },
    },
    {
      id: "gift-wrapping",
      name: "Gift Wrapping",
      values: ["No", "Yes"],
    },
  ],
};

describe("Product Details components", () => {
  it("renders ProductBreadcrumbs with the product name", () => {
    render(<ProductBreadcrumbs productName="Santal Parchment" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Fragrances")).toBeInTheDocument();
    expect(screen.getByText("Santal Parchment")).toBeInTheDocument();
  });

  it("renders ProductDetails spec-header elements accurately", () => {
    render(<ProductDetails product={sampleProduct} currentPrice={220} />);
    expect(screen.getByText("SCENT FAMILY: WOODY")).toBeInTheDocument();
    expect(screen.getByText("OCCASION: EVENING")).toBeInTheDocument();
    expect(screen.getByText("Santal Parchment")).toBeInTheDocument();
    expect(screen.getByText("$220")).toBeInTheDocument();
    expect(screen.getByText("Available in Atelier")).toBeInTheDocument();
  });

  it("renders ProductOptions with size buttons and gift wrapping toggle", () => {
    const handleOptionChange = jest.fn();
    render(
      <ProductOptions
        product={sampleProduct}
        selectedOptions={{ size: "100 ml", "gift-wrapping": "No" }}
        onChange={handleOptionChange}
      />,
    );

    expect(screen.getByText("Select Volume")).toBeInTheDocument();
    expect(screen.getByText("30 ml")).toBeInTheDocument();
    expect(screen.getByText("$140")).toBeInTheDocument();
    expect(screen.getByText("50 ml")).toBeInTheDocument();
    expect(screen.getByText("$180")).toBeInTheDocument();
    expect(screen.getByText("100 ml")).toBeInTheDocument();

    fireEvent.click(screen.getByText("50 ml"));
    expect(handleOptionChange).toHaveBeenCalledWith("size", "50 ml");

    expect(
      screen.getByText("Complimentary Signature Gift Wrapping"),
    ).toBeInTheDocument();
    const switchButton = screen.getByRole("switch");
    fireEvent.click(switchButton);
    expect(handleOptionChange).toHaveBeenCalledWith("gift-wrapping", "Yes");
  });

  it("renders ScentAnatomy notes pyramid and description", () => {
    render(<ScentAnatomy product={sampleProduct} />);
    expect(screen.getByText("Scent Anatomy")).toBeInTheDocument();
    expect(
      screen.getByText(
        "An evocative warmth of Australian sandalwood folded into spiced paper nuances.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Top Notes")).toBeInTheDocument();
    expect(screen.getByText("Bergamot, Incense, Pink Pepper")).toBeInTheDocument();
    expect(screen.getByText("Heart Notes")).toBeInTheDocument();
    expect(screen.getByText("Iris, Papyrus, Cedarwood")).toBeInTheDocument();
    expect(screen.getByText("Base Notes")).toBeInTheDocument();
    expect(
      screen.getByText("West Indian Sandalwood, Cardamom, Amber"),
    ).toBeInTheDocument();
  });

  it("renders AddToCartButton with quantity controls and dynamic price", () => {
    const handleQuantityChange = jest.fn();
    render(
      <AddToCartButton
        productId={sampleProduct.id}
        name={sampleProduct.name}
        price={220}
        image={sampleProduct.images[0]}
        selectedOptions={{ size: "100 ml" }}
        quantity={1}
        onQuantityChange={handleQuantityChange}
        showQuantitySelector
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart / $220")).toBeInTheDocument();

    const increaseBtn = screen.getByRole("button", { name: "Increase quantity" });
    fireEvent.click(increaseBtn);
    expect(handleQuantityChange).toHaveBeenCalledWith(2);
  });
});

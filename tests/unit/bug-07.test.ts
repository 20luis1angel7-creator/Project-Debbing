import { searchProducts } from "../../backend/services/productService"



describe("searchProducts", () => {
    test("returns the same products regardless of letter case", async () => {
        const normal = await searchProducts("Laptop")
        const lowerCase = await searchProducts("laptop")
        const uppercase = await searchProducts("LAPTOP")

        expect(normal).toEqual(lowerCase)
        expect(normal).toEqual(uppercase)
        expect(normal).toHaveLength(2)
    })
})
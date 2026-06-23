import { get } from "../../backend/database/db"
import { createOrder } from "../../backend/services/orderService"




describe("createOrder", () => {
    test("o`rder not reduce stock when payment fails", async () => {
        const productId = 1

        const before = await get<{ stock: number }>(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        )

        await expect(createOrder({
            userId: 1,
            items: [{ productId: 1, quantity: 1}],
            forcePaymentFail: true
        })
        ).rejects.toThrow("Payment provider rejected")

        const after = await get<{ stock: number }>(
            "SELECT stock FROM products WHERE id = ?",
            [productId]
        )

        expect(after?.stock).toBe(before?.stock)
    })
})
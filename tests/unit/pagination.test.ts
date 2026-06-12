import { listProducts } from "../../backend/controllers/productController"


describe("pagination", () => {
    test("have one colled json.json", async () => {
        const req = {
            query: {
                page: "1",
                limit: "10"
            }
        }

        const res = {
            json: jest.fn()
        }

        const next = jest.fn()

        await listProducts(req as any, res as any, next)

        expect(res.json).toHaveBeenCalled()
    })
    test("res with the produtcs", async () => {
        const req = {
            query: {}
        }

        const res = {
            json: jest.fn()
        }

        const next = jest.fn()

        await listProducts(req as any, res as any, next)

        expect(res).toHaveBeenCalledWith([])
    })
})
import { getProfile } from "../../backend/services/userService"
import request from "supertest"
import app from "../../backend/server"

describe("getProfile", () => {
    test("user 1 done", async () => {
        const result = await getProfile(1)

        expect(result).toBeDefined()
        expect(result?.address).toHaveProperty("city")
        expect(typeof result?.address?.city).toBe("string")
        expect(typeof result?.name).toBe("string")
    })

    test("does not crash user has no address", async () => {
        const resul = await getProfile(2)

        expect(resul).toBeDefined()
        expect(resul?.name).toBe("Ana Sin Direccion")
        expect(resul?.city).toBeUndefined()
    })
})

describe("cors", () => {
    test("keep get from mi:app", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Origin", "http://localhost:5173")

        expect(res.headers["Access-control-allow-origin"])
            .toBe("http://localhost:5173")
    })
    test("Unauthorized request are blocked", async () => {
        const res = await request(app)
            .get("/api/users")
            .set("Origin", "http://miapp.com")
        
        expect(res.headers["Access-control-allow-origin"])
            .toBeUndefined()
    })
})
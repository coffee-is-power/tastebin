import Fetch, {AxiosResponse} from "axios"
const fetch = Fetch.create({
    validateStatus() {
        return true
    }
})
describe("GET /api/post/:id", () => {
    let res: AxiosResponse<any>
    beforeAll(async () => {
        const id = (await fetch("http://localhost:3000/api/post", {
            method: "POST",
            data: {
                content: "Hello"
            }
        })).data.id
        res = await fetch("http://localhost:3000/api/post/"+id)
    })
    it("should return a string", () => {
        expect(typeof res.data).toBe("string")
    })
    it("should return the post contents", () => {
        expect(res.data).toBe("Hello")
    })
    it("should return 200 if it exists", () => {
        expect(res.status).toBe(200)
    })
    it("should return 404 if it doesn't exist", async () => {
        
        expect((await fetch("http://localhost:3000/api/post/gehre4hrfljsrgbrelkjgbgteilgrblergjbu")).status).toBe(404)
    })
})
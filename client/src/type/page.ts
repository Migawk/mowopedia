export default interface IPage {
  id: string | null
  name: string | null
  content: string | null
  keywords: string | null
  editable: "GUEST" | "MEMBER" | "ADMIN" | "CREATOR"
  img?: string
}

export { default } from "next-auth/middleware"

export const config = { 
	matcher: ["/pin-builder", "/profile", "/chatbox"],
}

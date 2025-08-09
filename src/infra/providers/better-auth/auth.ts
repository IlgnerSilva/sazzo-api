import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
	bearer,
	emailOTP,
	jwt,
	magicLink,
	multiSession,
	openAPI,
	organization,
	admin as pluginAdmin,
	twoFactor,
	username,
} from "better-auth/plugins";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config";
import { schema } from "@/infra/database/drizzle/schema";
import {
	ac,
	admin,
	collaborator,
	community,
	manager,
	member,
	owner,
	professional,
	support,
} from "./permissions";

export const auth = betterAuth({
	database: drizzleAdapter(drizzle(env.DATABASE_URL), {
		provider: "pg",
		schema: { ...schema },
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: false,
		async sendResetPassword(data, request) {
			// Send email with reset password link
			console.log(data, request);
		},
		password: {
			hash: async (password) => {
				return await hash(password, 6);
			},
			verify: async (data) => {
				return await compare(data.password, data.hash);
			},
		},
		resetPasswordTokenExpiresIn: 60 * 5,
	},
	advanced: {
		database: {
			generateId: () => {
				return crypto.randomUUID();
			},
		},

		disableCSRFCheck: false,
		defaultCookieAttributes: {
			sameSite: "Lax",
			httpOnly: true,
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		async sendVerificationEmail(data, request) {
			// Send email with verification link
			console.log(data, request);
		},
		async onEmailVerification(user, request) {
			console.log(user, request);
		},
		expiresIn: 60 * 5,
	},
	rateLimit: {
		enabled: true,
		window: 60,
		max: 100,
		storage: "memory",
		customRules: {
			"/api/auth/sign-in": {
				window: 60,
				max: 5,
			},
			"/api/auth/sign-up": {
				window: 60,
				max: 3,
			},
		},
	},
	logger: {
		level: "debug",
		disabled: false,
		log(level, message, ...args) {
			console.log(level, message, ...args);
		},
	},
	onAPIError: {
		onError: (error, request) => {
			console.log(error, request);
		},
	},
	session: {
		storeSessionInDatabase: false,
		preserveSessionInDatabase: false,
		disableSessionRefresh: false,
		expiresIn: 60 * 30,
		updateAge: 60 * 30,
		cookieCache: {
			enabled: true,
			maxAge: 60 * 30,
		},
	},
	user: {
		changeEmail: {
			enabled: false,
		},
		deleteUser: {
			enabled: false,
		},
	},
	account: {
		accountLinking: {
			trustedProviders: ["google"],
			updateUserInfoOnLink: true,
			enabled: true,
		},
		updateAccountOnSignIn: true,
	},
	plugins: [
		openAPI({
			path: "/api/auth/reference",
		}),
		jwt({
			jwt: {
				definePayload(session) {
					return session;
				},
			},
		}),
		multiSession({
			maximumSessions: 5,
		}),
		bearer({
			requireSignature: true,
		}),
		pluginAdmin({
			impersonationSessionDuration: 60 * 30,
			...ac,
			roles: {
				admin,
				support,
			},
		}),
		organization({
			ac,
			roles: {
				community,
				professional,
				member,
				collaborator,
				manager,
				owner,
			},
		}),
		emailOTP({
			otpLength: 6,
			expiresIn: 60 * 5,
			allowedAttempts: 5,
			async sendVerificationOTP({ email, otp, type }, request) {
				// Send email with OTP
				console.log(email, otp, type, request);
			},
		}),
		magicLink({
			expiresIn: 60 * 5,
			sendMagicLink({ email, token, url }, request) {
				// Send email with magic link
				console.log(email, token, url, request);
			},
		}),
		username({
			maxUsernameLength: 20,
			minUsernameLength: 3,
		}),
		twoFactor({
			otpOptions: {
				digits: 6,
				period: 30,
				sendOTP(data, request) {
					console.log(data, request);
				},
			},
			totpOptions: {
				digits: 6,
				period: 30,
				backupCodes: { length: 10 },
			},
		}),
	],
});

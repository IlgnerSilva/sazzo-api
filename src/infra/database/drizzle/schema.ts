import { account } from "./entities/account.entity";
import { apikey } from "./entities/api-key.entity";
import { invitation } from "./entities/invitation.entity";
import { jwks } from "./entities/jwsk.entity";
import { member } from "./entities/member.entity";
import { organization } from "./entities/organization.entity";
import { session } from "./entities/session.entity";
import { twoFactor } from "./entities/two-factor.entity";
import { user } from "./entities/user.entity";
import { verification } from "./entities/verification.entity";

export const schema = {
	account,
	apikey,
	invitation,
	jwks,
	member,
	organization,
	session,
	twoFactor,
	user,
	verification,
};

export type Schema = typeof schema;

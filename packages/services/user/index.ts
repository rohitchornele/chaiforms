import { createHash, createHmac, randomBytes } from 'node:crypto';
import { db, eq } from '@repo/database';
import { usersTable } from '@repo/database/models/user';
import { createUserWithEmailAndPasswordInput, type CreateUserWithEmailAndPasswordInputType } from "./model";
import { setMaxListeners } from 'node:events';



class UserService {

  private async getUserByEmail(email : string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if(!result || result.length === 0) {
      return null
    }

  }

  public async createUserWithEmailAndPassword(payload : CreateUserWithEmailAndPasswordInputType) {

    const {fullName, email, password} = await createUserWithEmailAndPasswordInput.parseAsync(payload)

    const exisitngUserWithEmail = await this.getUserByEmail(email);

    if(exisitngUserWithEmail) throw new Error('User with email already exists');

    // calculate salt & hash the password
    const salt = randomBytes(16).toString('hex');
    const hash = createHmac('sha256', salt).update(password).digest('hex')

    // create user in db
    const userInsertResult = await db.insert(usersTable).values({email, fullName, password: hash, salt}).returning({
      id: usersTable.id
    })

    if(!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id) throw new Error("Something went wrong while creating a user");

    return {
      id: userInsertResult[0]?.id
    }

  }
}

export default UserService;

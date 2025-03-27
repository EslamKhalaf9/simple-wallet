import { CreateAccountDto } from '../dtos/create-account.dto';

async function createAccount(account: CreateAccountDto) {
  console.log('create account');
}

export default { createAccount };

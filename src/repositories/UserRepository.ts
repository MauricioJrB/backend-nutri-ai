import { User } from '../entities/User';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUser/IUserRepository';

export class UserRepository implements IUserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepository(prisma);
  }

  public async save(user: User): Promise<User> {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const savedUser = await this.prisma.user.create({ data });

    return User.load(
      savedUser.id,
      savedUser.name,
      savedUser.email,
      savedUser.password,
    );
  }

  public async find(id: string): Promise<User | null> {
    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) return null;

    const { name, email, password } = userExists;
    const user = User.load(id, name, email, password);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const emailExists = await this.prisma.user.findUnique({ where: { email } });
    if (!emailExists) return null;

    const { id, name, password } = emailExists;
    const user = User.load(id, name, email, password);
    return user;
  }

  public async update(id: string, password: string): Promise<void> {
    const data = {
      password: password,
    };
    await this.prisma.user.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { User } from '../../entities/User';
import { UserMapper } from '../../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepository(prisma);
  }

  public async save(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: data.id || undefined,
        email: data.email,
        name: data.name,
        provider: data.provider,
        idProvider: data.idProvider || null,
        photoUrl: data.photoUrl || null,
        password: data.password || null,
      },
    });

    return UserMapper.fromPrisma(user);
  }

  public async find(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return UserMapper.fromPrisma(user);
  }

  public async findByIdProvider(idProvider: string) {
    const user = await this.prisma.user.findUnique({
      where: { idProvider },
    });
    if (!user) return null;

    return UserMapper.fromPrisma(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return UserMapper.fromPrisma(user);
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

import { Brackets, DeleteResult, EntityRepository, Repository } from "typeorm";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";
import * as slug from "slug";
import { GetAdsDTO } from "./dto/get-ads.dto";
import { User } from "src/auth/entities/user.entity";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Ad)
export class AdsRepository extends Repository<Ad> {
  // Checks in db and returs a consecutive indexed slug to be used
  private async getUniqueSlug(title: string): Promise<string> {
    let index = 0;
    while (true) {
      const slugTemp = slug(title) + (index > 0 ? `-${index}` : "");
      const found = await this.findOne({ slug: slugTemp });
      if (!found) {
        return slugTemp;
      }
      index++;
    }
  }
  async createAd(createAdDto: CreateAdDTO, user: User): Promise<Ad> {
    // calculate unique slug
    const slug: string = await this.getUniqueSlug(createAdDto.title);

    const ad = new Ad();
    ad.title = createAdDto.title;
    ad.description = createAdDto.description;
    ad.slug = slug;
    ad.user = user;

    return await this.save(ad);
  }

  async getAds(getAdsDto: GetAdsDTO, user: User | null): Promise<Ad[]> {
    const query = this.createQueryBuilder("ads");

    const { status, keywords } = getAdsDto;

    if (user) {
      query.andWhere({ user });
    } else {
      // Add user relation
      query.leftJoinAndSelect("ads.user", "user");
    }

    if (status) {
      query.andWhere("ads.status = :status", { status });
    }

    if (keywords) {
      const wilcardKeywords = `%${keywords}%`;
      query.andWhere(
        new Brackets((qb) => {
          qb.where("ads.title LIKE :keywords", { keywords: wilcardKeywords }).orWhere(
            "ads.description LIKE :keywords",
            { keywords: wilcardKeywords },
          );
        }),
      );
    }

    const ads = await query.getMany();

    return ads;
  }

  async deleteAd(id: string, user: User | null): Promise<void> {
    const result: DeleteResult = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}

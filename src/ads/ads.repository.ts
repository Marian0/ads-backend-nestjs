import { Brackets, EntityRepository, Repository } from "typeorm";
import { CreateAdDTO } from "./dto/create-ad.dto";
import { Ad } from "./entities/ad.entity";
import * as slug from "slug";
import { GetAdsDTO } from "./dto/get-ads.dto";

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
  async createAd(createAdDto: CreateAdDTO): Promise<Ad> {
    // calculate unique slug
    const slug: string = await this.getUniqueSlug(createAdDto.title);

    const ad = new Ad();
    ad.title = createAdDto.title;
    ad.description = createAdDto.description;
    ad.slug = slug;

    return await this.save(ad);
  }

  async getAds(getAdsDto: GetAdsDTO): Promise<Ad[]> {
    const query = this.createQueryBuilder("ads");

    const { status, keywords } = getAdsDto;

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
}

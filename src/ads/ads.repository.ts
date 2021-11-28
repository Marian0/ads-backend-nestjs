import { EntityRepository, Repository } from "typeorm";
import { Ad } from "./entities/ad.entity";

@EntityRepository(Ad)
export class AdsRepository extends Repository<Ad> {}

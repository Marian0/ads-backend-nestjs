import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { AdStatus } from "src/ads/entities/ad-status.enum";
import { Ad } from "src/ads/entities/ad.entity";
import { Role } from "src/auth/entities/role.enum";
import { User } from "src/auth/entities/user.entity";
import { ActionTypes } from "./action-types.enum";

type Subjects = InferSubjects<typeof Ad | typeof User> | "all";

export type AppAbility = Ability<[ActionTypes, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[ActionTypes, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role === Role.ADMIN) {
      can(ActionTypes.Manage, "all"); // read-write access to everything
    } else {
      can(ActionTypes.Read, "all"); // read-only access to everything
      can(ActionTypes.Update, Ad, { user });
      can(ActionTypes.Delete, Ad, { userId: user.id });
      cannot(ActionTypes.Delete, Ad, { status: AdStatus.PENDING });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

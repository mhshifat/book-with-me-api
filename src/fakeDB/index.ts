import { IFileDocument } from "../models/file/index";
import { models } from "../models/index";
import { IRentalDocument } from "../models/Rental/index";
import { IUserDocument } from "../models/User/index";
import { images } from "./data/images";
import { rentals } from "./data/rentals";
import { users } from "./data/users";

export class FakeDB {
  users: IUserDocument[] = users;
  rentals: IRentalDocument[] = rentals;
  files: IFileDocument[] = images;

  public async init() {
    try {
      await models.User.deleteMany({});
      await models.Rental.deleteMany({});
      await models.File.deleteMany({});
      const createdFiles = await models.File.create(this.files);
      const createdUsers = await models.User.create(this.users);
      await models.Rental.create(
        this.rentals.map((item, index) => ({
          ...item,
          owner: createdUsers[0].id,
          image: createdFiles[index].id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  }
}

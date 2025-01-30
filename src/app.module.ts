import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { PropertyModule } from './property/property.module';
import { ContactModule } from './contact/contact.module';
import { PayModule } from './pay/pay.module';

@Module({
  imports: [PeopleModule, PropertyModule, ContactModule, PayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as generatedId } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveyUser {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  // Relacionamento da Tabela
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey: Survey;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = generatedId();
    }
  }
}

export { SurveyUser };
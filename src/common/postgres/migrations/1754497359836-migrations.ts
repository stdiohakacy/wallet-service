import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1754497359836 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO wallets (
        id, user_id, balance_value, balance_currency, created_date, created_user_id, updated_date
      ) VALUES 
        (
          'bac4fbe2-1b2e-49f7-a8a7-b2ba8f845eca',
          '513af0c9-79c6-4c00-a525-008a6adfda3b',
          0,
          'USD',
          NOW(),
          '513af0c9-79c6-4c00-a525-008a6adfda3b',
          NOW()
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM wallets
      WHERE id IN (
        'bac4fbe2-1b2e-49f7-a8a7-b2ba8f845eca'
      );
    `);
    }
}

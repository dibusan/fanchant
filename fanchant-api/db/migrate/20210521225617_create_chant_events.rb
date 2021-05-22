class CreateChantEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :chant_events do |t|
      t.datetime :scheduled_for
      t.references :chant, foreign_key: true

      t.timestamps
    end
  end
end

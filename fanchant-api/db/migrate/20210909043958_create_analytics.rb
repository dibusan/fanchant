class CreateAnalytics < ActiveRecord::Migration[5.2]
  def change
    create_table :analytics do |t|
      t.string :device_id
      t.string :url
      t.string :event
      t.string :device_type
      t.json :extra

      t.timestamps
    end
  end
end

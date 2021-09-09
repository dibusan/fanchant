class UpdateExtra < ActiveRecord::Migration[5.2]
  def change
    change_column :analytics, :extra, :string
  end
end

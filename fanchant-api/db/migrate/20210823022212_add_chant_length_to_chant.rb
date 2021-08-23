class AddChantLengthToChant < ActiveRecord::Migration[5.2]
  def change
    add_column :chants, :length, :integer, default: 0
  end
end

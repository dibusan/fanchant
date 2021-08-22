class AddChantVersionSupport < ActiveRecord::Migration[5.2]
  def change
    add_column :chants, :version, :integer, default: 2
  end
end

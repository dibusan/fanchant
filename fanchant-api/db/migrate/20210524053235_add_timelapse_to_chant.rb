class AddTimelapseToChant < ActiveRecord::Migration[5.2]
  def change
    add_column :chants, :timelapse, :integer
  end
end
